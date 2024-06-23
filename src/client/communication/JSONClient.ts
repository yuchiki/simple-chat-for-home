type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export class JSONClient<GetBody = Record<string, never>, PostBody = Record<string, never>, PutBody = Record<string, never>, DeleteBody = Record<string, never>> {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async send<Body>(method: Method, body: Body | undefined): Promise<object> {
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

  async get(body: GetBody): Promise<object> {
    return this.send('GET', body)
  }

  async post(body: PostBody): Promise<object> {
    return this.send('POST', body)
  }

  async put(body: PutBody): Promise<object> {
    return this.send('PUT', body)
  }

  async delete(body: DeleteBody): Promise<object> {
    return this.send('DELETE', body)
  }
}
