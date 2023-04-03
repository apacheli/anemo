export class Anemo {
  #key;

  constructor(key) {
    this.#key = key;
  }

  async #request(method, path, { body, headers } = {}) {
    const response = await fetch(`https://api.openai.com/v1${path}`, {
      body,
      headers: {
        "Authorization": `Bearer ${this.#key}`,
        "User-Agent": "Anemo/0.0.2",
        ...headers,
      },
      method,
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.error.message, { cause: data });
  }

  #json(path, body) {
    return this.#request("POST", path, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  #formData(path, files) {
    const body = new FormData();
    for (const key in files) {
      body.append(key, files[key]);
    }
    return this.#request("POST", path, { body });
  }

  listModels() {
    return this.#request("GET", "/models");
  }

  retrieveModel(model) {
    return this.#request("GET", `/models/${model}`);
  }

  createCompletion(body) {
    return this.#json("/completions", body);
  }

  createChatCompletion(body) {
    return this.#json("/chat/completions", body);
  }

  createEdit(body) {
    return this.#json("/edits", body);
  }

  createImage(body) {
    return this.#formData("/images", body);
  }

  createImageEdit(body) {
    return this.#formData("/images/edits", body);
  }

  createImageVariation(body) {
    return this.#formData("/images/variations", body);
  }

  createEmbeddings(body) {
    return this.#json("/embeddings", body);
  }

  createTranscription(body) {
    return this.#formData("/audio/transcriptions", body);
  }

  createTranslation(body) {
    return this.#formData("/audio/translations", body);
  }

  listFiles() {
    return this.#request("GET", "/files");
  }

  uploadFile(body) {
    return this.#formData("/files", body);
  }

  deleteFile(fileId) {
    return this.#request("DELETE", `/files/${fileId}`);
  }

  retrieveFile(fileId) {
    return this.#request("GET", `/files/${fileId}`);
  }

  retrieveFileContent(fileId) {
    return this.#request("GET", `/files/${fileId}/content`);
  }

  createFineTune(body) {
    return this.#json("/fine-tunes", body);
  }

  listFineTunes() {
    return this.#request("GET", "/fine-tunes");
  }

  retrieveFineTune(fineTuneId) {
    return this.#request("GET", `/fine-tunes/${fineTuneId}`);
  }

  cancelFineTune(fineTuneId) {
    return this.#request("POST", `/fine-tunes/${fineTuneId}/cancel`);
  }

  listFineTuneEvents(fineTuneId) {
    return this.#request("GET", `/fine-tunes/${fineTuneId}/events`);
  }

  deleteFineTuneModel(fineTuneId) {
    return this.#request("DELETE", `/fine-tunes/${fineTuneId}`);
  }
}
