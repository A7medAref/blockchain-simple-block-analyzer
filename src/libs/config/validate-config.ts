import * as Joi from "joi";
import * as dotenv from "dotenv";

dotenv.config();

const JoiNumberCasting = Joi.alternatives().try(
  Joi.number(),
  Joi.string()
    .regex(/^\d+$/)
    .custom((value) => Number(value))
);

const envVarsSchema = Joi.object({
  PORT: JoiNumberCasting.optional().default(3000),

  ETH_RPC_URL: Joi.string()
    .uri()
    .required()
}).strict();

export default envVarsSchema;
