
import { CustomError, RegisterCargoDto, RegisterSede, RegisterSedeDto, SedeRepository } from "../../domian";
import { SedeModel } from "../../data/mysql/models/sede.model";
import { json } from "stream/consumers";
import { Request, Response } from "express"


export class sedeController {

      constructor(

            //Inyeccion de dependencia
            private readonly sedeRepository: SedeRepository

      ) { }

      private handError = (error: unknown, res: Response) => {
            if (error instanceof CustomError) {
                  return res.status(error.statusCode).json({ error: error.message })
            } else {
                  console.error('Unexpected error', error)
                  return res.status(500).json({ error: 'Internal server Error' })

            }

      }

      findOneById = async (req: Request, res: Response): Promise<void> => {

            const { idSede } = req.params

            try {
                  const sede = await SedeModel.findUnique({
                        where: { idSede: Number(idSede) }
                  })
                  if (!sede) {
                        res.status(404).json({ message: 'Curso no encontrado' })
                  }
                  res.json({ sede })
            } catch (error) {
                  res.status(500).json({ error: 'Internal server error' })

            }
      }
      findALL = async (req: Request, res: Response): Promise<void> => {
            try {
                  const sedes = await SedeModel.findMany();
                  if (sedes.length === 0) {
                        res.status(400).json({ message: 'No se encontraron las sedes.' });
                  }
                  res.json({ sedes });
            } catch (error) {
                  res.status(500).json({ error: 'Internal server error' });
            }
      };

      registerSede = async (req: Request, res: Response) => {
            const [error, registerSedeDto] = RegisterSedeDto.create(req.body)

            if (error) {
                  res.status(400).json({ error })
                  return
            }
            new RegisterSede(this.sedeRepository)
                  .execute(registerSedeDto!)
                  .then((data) => res.json(data))
                  .catch(error => this.handError(error, res))
      }
      updateSede = async (req: Request, res: Response): Promise<void> => {
            const { id } = req.params

            // Validar el ID recibido
            const idNumber = Number(id);
            if (isNaN(idNumber)) {
                  res.status(400).json({ error: "Invalid ID format" });
                  return;
            }

            const updateData = req.body;

            try {
                  const [error, updateSedeDto] = RegisterSedeDto.create(updateData);

                  if (error || !updateSedeDto) {
                        res.status(400).json({ error: "Invalid data format", details: error });
                        return;
                  }

                  const sede = await SedeModel.update({
                        where: { idSede: idNumber },
                        data: {
                              NombreSede: updateSedeDto.nombreSede,
                              Direccion: updateSedeDto.direccion,
                              Telefono: updateSedeDto.telefono,
                              Email: updateSedeDto.email,
                              Imagen_Url: updateSedeDto.imagen_Url,
                        },
                  });

                  if (!sede) {
                        res.status(404).json({ message: "Sede not found" });
                        return;
                  }

                  res.json({ sede });
            } catch (error) {
                  console.error("Error during updateSede:", error);
                  res.status(500).json({ error: "Internal Server Error" });
            }
      }


}