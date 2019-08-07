export interface ServerLog{

    message: string;
    url: string;
    userName: string;
    stack: string;
}
/*
//Obj enviado para o back-end controlar o log do front
console.log({ 
    message, 
    url, 
    userName: userService.getUserName(),
    stack: stackAsString
});

*/