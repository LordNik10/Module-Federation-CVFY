interface ICustomError {
  message?: string;
  name?: string;
  statusCode?: number;
  description?: string;
}

class CustomError {
  message?: string;

  name?: string;

  statusCode?: number;

  description?: string;

  constructor({ message, name, statusCode, description }: ICustomError) {
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
  }
}

export default CustomError;
