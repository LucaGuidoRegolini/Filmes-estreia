class InvalidArgumentError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "InvalidArgumentError";
  }
}

class UnauthorizedError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "UnauthorizedError";
  }
}

export { InvalidArgumentError, UnauthorizedError };
