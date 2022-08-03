/* Apuntes:

JS es un lenguaje principalmente sincrónico; puede sólo hacer una cosa. 

El motor para JS de Chrome
V8 es especial por ser estable y open source. Por ello se ha convertido en un estándar de industria, salvo por Firefox. Nació para que Google Maps corriera rápido, aunque existe desde 2008, por lo que tomó 3 años desde que salió Maps hasta V8 

Lo primero que hace el navegador es generar un entorno global o general llamado "Window". Este es un objeto con determinados atributos. Luego, crea una variable llamada "this", que se refiere a "Window" también. 
Tras ello, crea el contexto de ejecución, donde corre el código de la página. Esto funciona a través de una pila de tareas abstracta. Para lograrlo, esquila, analiza o "parsea" el código de JS en el que detecta "palabras clave". Luego, crea el Abstract Syntax Tree, donde se hallan reescritos o reformateados los entes fundamentales (variables, funciones y quizás otras cosas) de JS. Luego, lo interpreta y crea las tareas con base en lo que el AST le diga. Tras ello, genera "bytecode", un lenguaje más abstracto que el de la máquina o el binario, pero menos que JS. 
El paso de la interpretación puede sucederse por un paso de optimización si el motor considera que puede optimizar el código recibido. Aquí es donde sucede el hoisting, que puede generar errores de hoisting. 

Hoisting
En JS "guardamos en memoria" las "var" (no confundir con variable) y las "funciones" al analizar inicialmente los scripts. Es recomendado poner las variables y funciones al inicio para que no nos pase que creemos variables o funciones con nombre idéntico a otras por accidente, entre otras cosas. 

Memory-heap
Memory Heap es una especie de estante donde se guardan variables y funciones. No funciona linealmente. Cuando se le pide a JS que nos presente el valor de alguna variable, este va al Memory Heap a buscar dónde está ello. 

Call Stack
Call stack es otro concepto abstracto de JS, donde se "anotan" las tareas que JS ha de realizar tras analizar el código. Al final del "call stack" se halla el Global Object. Como un buen stack (o stash si trabajas git), lo primero en entrar es lo último en salir, y lo último en entrar es lo primero en salir. Así, por ejemplo, si JS evalua una función, hará esto antes de "cancelarse" y (re)tomar la siguiente tarea. Cuando sucede un error (o excepción), JS entrega un registro del estado presente del "call stack". Otra cosa que puede suceder, es que se exceda el tamaño del "call stack" puede ser sobrepasado por las llamadas creadas, por ejemplo si usamos un recursivo del tipo:
function recursive()
{
  recursive();
  console.log("u")
}
console.log(recursive());
Al  ejecutar, notaremos que el ejecutador de v8 nos dice que sucedió una excepción de rango, donde se metieron más llamadas a la pila de llamadas de las posibles. Si no se controla, este error puede paralizar al motor e incluso al computador

Garbage Collection
En JS, la recolección de variables que no se usan y demás información despreciable (denominada "garbage collection") se hace a través de un proceso llamado "Mark and sweep" o "marcar y barrer". Esto sucede por defecto, aunque hay que tener cuidado, por ejemplo, con ciclos infinitos u otras cosas que repliquen procesos constantemente, pues esto puede ocupar mucha memoria y hacer que falle el programa. La información despreciable se caracteriza, en general, por no tener vínculos con el objeto global.

Asincronía
Cuando hablamos de JS, normalmente contamos que es un lenguaje sincrónico. ¿Entonces, cómo realizamos procesos asíncronos en JS? Pues, bien, antes de ver eso, analicemos lo que son las IPAs (interfaces programables de aplicación). Estas son medios por los que podemos interactuar con el navegador, herramientas de las que se dispone o el servidor desde una página web. Estas son parte del objeto global (Window). 
Estas IPA permiten que JS le delegue al navegador ciertas tareas y se dedique a otras cosas. Mientras, el navegador desarrolla estas nuevas funciones o tareas. Cuando acaba, las envía al "callback queue" o "fila de invocantes" (se llaman así porque son funciones que se dan como argumento a otras funciones para desarrollar, dentro de estas últimas, una tarea; en este caso, dentro de una IPA). Esto se comunica con la pila de llamados, revisando si está aún ocupada o no. Esto se hace a través del ciclo de eventos ("Event Loop"). Cuando está vacía la pila, las funciones de la fila se desplazan a la pila, para que el Call Stack las desarrolle y finalice. 
Esto funciona incluso si usamos un setTimeout(()=>{}, 0), porque igual ha de esperar a que la pila se vacíe.
*/