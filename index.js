
import dotenv from 'dotenv';
import { addMessage, updateMessage } from './axiosApi.js'
import fs from 'fs';
import csv from 'csv-parser';
import { logger } from './logger.js';
import neatCsv from 'neat-csv';
import ObjectsToCsv from 'objects-to-csv'

dotenv.config();


//check if the title is in correct format
const updateAddMessages = async () => {
	let titlesToCompare = ['key', 'message', 'to_name', 'from_name']
	fs.createReadStream('messages.csv')
		.pipe(csv())
		.on('headers', (headers) => {
			const lowerCased = headers.map(name => name.toLowerCase());
			if (lowerCased.length == titlesToCompare.length
				&& lowerCased.every((u, i) => {
					return u === titlesToCompare[i];
				})
			) {
				try {
					fs.readFile('./messages.csv', async (err, data) => {
						if (err) {
							logger.error(err)
							return
						}
						let messagesList = await neatCsv(data)

						for (let i = 0; i < messagesList.length; i++) {
							if (messagesList[i].key == '') {
								try {
									let res = await addMessage(messagesList[i]);
									messagesList[i].key = res
									logger.info('The addition was successful, the key added:', res);
								} catch (err) {
									logger.error(err.message)
								}

							}
							else {

								try {
									let res = await updateMessage(messagesList[i])
									logger.info(res)
								} catch (err) {
									logger.error(err)
								}
							}
						}
										try {
						await updateCsv(messagesList);
					}
					catch (err) {
						logger.error(err.message)
					}
					})

	
				} catch (err) {
					logger.error(err.message);
				}

			}
			else {
				logger.info('The title is not in correct format');
			}
		})

}
updateAddMessages()

// update the keys added
const updateCsv = async (messagesList) => {
	const csv = new ObjectsToCsv(messagesList);
	try {
		await csv.toDisk('./messages.csv')
	}
	catch (err) {
		throw new Error('The update csv file faild')
	}

}


