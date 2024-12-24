

export class UsuarioEntity{
  
    constructor(
    public idUsuario:number,
    public nombre :string,
    public apellido:string,
    public documento:string,
    public numeroDocumento:number,
    public email:string,
    public nombreUsuario:string,
    public password:string,
    public idCargo: number,
    public estadio?:boolean
    ){}  

}