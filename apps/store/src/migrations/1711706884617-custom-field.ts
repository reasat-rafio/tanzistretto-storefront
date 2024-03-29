import {MigrationInterface, QueryRunner} from "typeorm";

export class customField1711706884617 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsMarkdefault" boolean`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsMarkdefault"`, undefined);
   }

}
