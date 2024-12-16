import { Command } from "commander";

const program = new Command();

//1 - commando // 2- descripcion // 3- valor default
program.option("--mode <mode>", "entorno de trabajo", "dev");
program.parse();

export default program;
