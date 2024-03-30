import {MigrationInterface, QueryRunner} from "typeorm";

export class addShowNewTag1711783613202 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsShownewtag" boolean`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsShownewtag"`, undefined);
   }

}
