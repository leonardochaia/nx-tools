/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Pushes the state of your Prisma schema file to the database without using migrations.
 */
export interface PrismaPushSchema {
  /**
   * The path to the prisma schema eg. 'prisma/schema.prisma'
   */
  schema?: string;
  /**
   * Optional flags
   */
  options?: {
    /**
     * Skip generation of artifacts such as Prisma Client.
     */
    'skip-generate'?: boolean;
    /**
     * Resets the database and then updates the schema - useful if you need to start from scratch due to unexecutable migrations.
     */
    'force-reset'?: boolean;
    /**
     * Ignore data loss warnings. This option is required if as a result of making the schema changes, data may be lost.
     */
    'accept-data-loss'?: boolean;
  };
}
