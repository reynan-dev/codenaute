import { ObjectLiteral } from 'typeorm';
import { Database } from 'utils/configs/database';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { UUID } from 'utils/types/Uuid';

export abstract class BaseServices {
	repository: any;

	constructor(entity: any) {
		this.repository = Database.repository(entity);
	}

	async create(data: ObjectLiteral) {
		let created = await this.repository.create(data);

		return await this.repository.save(created);
	}

	async delete(id: UUID) {
		let obj = await this.findById(id);

		if (!obj) throw Error(ErrorMessages.NOT_FOUND_ERROR_MESSAGE);

		return await this.repository.remove(obj);
	}

	async find() {
		return await this.repository.find();
	}

	async findBy(filter: ObjectLiteral = {}) {
		if (Object.keys(filter).length === 0) return await this.find();

		return await this.repository.findBy(filter);
	}

	async findById(id: string) {
		return this.repository.findOneBy({ id: id });
	}

	async findOneBy(filter: ObjectLiteral = {}) {
		if (Object.keys(filter).length === 0) return await this.find();

		return await this.repository.findOneBy(filter);
	}

	async update(id: UUID, data: ObjectLiteral) {
		let obj = (await this.findById(id)) as ObjectLiteral;

		if (!obj) throw Error(ErrorMessages.NOT_FOUND_ERROR_MESSAGE);

		if (Object.keys(data).length === 0) throw Error(ErrorMessages.EMPTY_FIELD_ERROR_MESSAGE);

		let updated = this.repository.merge(obj, data);

		return await this.repository.save(updated);
	}
}
