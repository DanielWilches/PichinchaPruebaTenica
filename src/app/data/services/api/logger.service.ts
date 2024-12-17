import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerService {

  constructor() 
  { }

  log(time:string,  clase:string, metodo:string , msg: unknown) 
  { 
    console.log(`[${time}] [${clase}.${metodo}] :  `,msg ); 
  }
  error(time:string,  clase:string, metodo:string , msg: unknown) 
  { 
    console.error(`[${time}] [${clase}.${metodo}] :  `,msg ); 
  }
  warn(time:string,  clase:string, metodo:string , msg: unknown) { 
    console.warn(`[${time}] [${clase}.${metodo}] :  `,msg ); 
  }

  ObtenerMetodo(): string {
    const error = new Error();
    const stack = error.stack?.split('\n');
    const callerLine = stack && stack[2];
    const methodName = callerLine?.match(/at (\w+)/)?.[1];
    return methodName || 'unknown';
  }
}
