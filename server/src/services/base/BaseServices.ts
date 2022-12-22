import { ObjectLiteral } from 'typeorm';
import { dataSource } from '../../db';

import {
	NOT_FOUND_ERROR_MESSAGE,
	EMPTY_FIELD_ERROR_MESSAGE,
	NOT_CREATED_ERROR_MESSAGE,
	NOT_UPDATED_ERROR_MESSAGE
} from '../../utils/errorMessage';
export default abstract class BaseServices {
	repository: any;

	constructor(entity: any) {
		this.repository = dataSource.getRepository(entity);
	}

	async find() {
		return await this.repository.find();
	}

	async findBy(filter: ObjectLiteral = {}) {
		if (Object.keys(filter).length === 0) {
			return await this.find();
		}

		return await this.repository.find(filter);
	}

	async findById(id: string) {
		if (!id) {
			throw Error(EMPTY_FIELD_ERROR_MESSAGE);
		}

		return await this.repository.findOneBy({ id: id });
	}

	async create(data: ObjectLiteral = {}) {
		if (Object.keys(data).length === 0) {
			throw Error(EMPTY_FIELD_ERROR_MESSAGE);
		}

		let created = await this.repository.create(data);
		if (!created) {
			throw Error(NOT_CREATED_ERROR_MESSAGE);
		}
		return await this.repository.save(created);
	}

	async update(id: string, data: ObjectLiteral = {}) {
		if (!id) {
			throw Error(EMPTY_FIELD_ERROR_MESSAGE);
		}

		let obj = (await this.findById(id)) as ObjectLiteral;

		if (Object.keys(data).length === 0) {
			throw Error(NOT_FOUND_ERROR_MESSAGE);
		}

		let updated = this.repository.merge(obj, data);
		if (!updated) {
			throw Error(NOT_UPDATED_ERROR_MESSAGE);
		}
		return await this.repository.save(updated);
	}

	async delete(id: string) {
		if (!id) {
			throw Error(EMPTY_FIELD_ERROR_MESSAGE);
		}

		let obj = await this.findById(id);
		return await this.repository.remove(obj);
	}
}
