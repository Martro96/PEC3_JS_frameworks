export class Todo {
  id: string;
  text: string;
  complete: boolean;

  constructor(text: string, complete: boolean = false) {
    this.id = this.uuidv4();
    this.text = text;
    this.complete = complete;
  }

  uuidv4(): string { //de esto no tenía ni idea y lo he buscado en internet
    return ([1e7, -1e3, -4e3, -8e3, -1e11]).join('').replace(/[018]/g, (c: string) => {
      const num = parseInt(c, 16); // Convertimos el carácter a número hexadecimal
      return (
        (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4))))
          .toString(16)
      );
    });
  }
}