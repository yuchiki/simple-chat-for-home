type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export class JSONClient {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async send(method: Method, body: object | undefined): Promise<object> {
    const options = method === 'GET'
      ? {}
      : {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
    return (await fetch(this.url, options)).json() as object
  }

  async get(body: object): Promise<object> {
    return this.send('GET', body)
  }

  async post(body: object): Promise<object> {
    return this.send('POST', body)
  }

  async put(body: object): Promise<object> {
    return this.send('PUT', body)
  }

  async delete(body: object): Promise<object> {
    return this.send('DELETE', body)
  }
}
