export interface iNote{
    title:string;
    body:string;
    id:string;
}

export interface iUpdateNote{
    title?:string;
    body?:string;
    id:string;
}


export interface ParamsDictionary {
    [key: string]: string ;
  }

