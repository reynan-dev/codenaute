import { ObjectLiteral } from 'typeorm';
import { dataSource } from '../../db.js';

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
			throw Error('Empty id');
		}

		return await this.repository.findOneBy({ id: id });
	}

	async create(data: ObjectLiteral = {}) {
		if (Object.keys(data).length === 0) {
			throw Error('Empty data');
		}

		let created = await this.repository.create(data);
		if (!created) {
			throw Error('Not created');
		}
		return await this.repository.save(created);
	}

	async update(id: string, data: ObjectLiteral = {}) {
		if (!id) {
			throw Error('Empty id');
		}

		let obj = (await this.findById(id)) as ObjectLiteral;

		if (Object.keys(data).length === 0) {
			throw Error('Not founded');
		}

		let updated = this.repository.merge(obj, data);
		if (!updated) {
			throw Error('Not updated');
		}
		return await this.repository.save(updated);
	}

	async delete(id: string) {
		if (!id) {
			throw Error('Empty id');
		}

		let obj = await this.findById(id);
		return await this.repository.remove(obj);
	}
}
