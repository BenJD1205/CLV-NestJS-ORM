import { MigrationInterface, QueryRunner } from "typeorm";

export class TblUser1706316903883 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE USERS(
                ID SERIAL PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                office_code VARCHAR(255) NULL,
                country_code VARCHAR(255) NULL,
                is_active BOOLEAN NOT NULL DEFAULT false,
                gender VARCHAR(255) NULL,
                phone VARCHAR(255) NULL,
                role  VARCHAR(255) NULL DEFAULT 'USER', 
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL DEFAULT NULL
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE USERS
        `)
    }

}
