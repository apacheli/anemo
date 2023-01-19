export class Anemo {
  #key;

  /**
   * @param {string} key
   */
  constructor(key) {
    this.#key = key;
  }

  async #request(method, path, body) {
    const init = {
      headers: {
        "Authorization": `Bearer ${this.#key}`,
      },
      method,
    };
    if (body !== undefined) {
      init.body = JSON.stringify(body);
      init.headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`https://api.openai.com/v1${path}`, init);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(`[${data.error.type}] ${data.error.message}`);
  }

  /** https://beta.openai.com/docs/api-reference/models/list */
  listModels() {
    return this.#request("GET", "/models");
  }

  /**
   * https://beta.openai.com/docs/api-reference/models/retrieve
   *
   * @param {string} model The ID of the model to use for this request
   */
  retrieveModel(model) {
    return this.#request("GET", `/models/${model}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/completions/create
   *
   * @param {CreateCompletionBody} body
   */
  createCompletion(body) {
    return this.#request("POST", "/completions", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/edits/create
   *
   * @param {CreateEditBody} body
   */
  createEdit(body) {
    return this.#request("POST", "/edits", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/images/create
   *
   * @param {CreateImageBody} body
   */
  createImage(body) {
    return this.#request("POST", "/images/generations", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/images/create-edit
   *
   * @param {CreateImageEditBody} body
   */
  createImageEdit(body) {
    return this.#request("POST", "/images/edits", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/images/create-variation
   *
   * @param {CreateImageVariationBody} body
   */
  createImageVariation(body) {
    return this.#request("POST", "/images/variations", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/embeddings/create
   *
   * @param {CreateEmbeddingsBody} body
   */
  createEmbeddings(body) {
    return this.#request("POST", "/embeddings", body);
  }

  /** https://beta.openai.com/docs/api-reference/files/list */
  listFiles() {
    return this.#request("GET", "/files");
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/upload
   *
   * @param {UploadFileBody} body
   */
  uploadFile(body) {
    return this.#request("POST", "/files", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/delete
   *
   * @param {string} file_id
   */
  deleteFile(file_id) {
    return this.#request("DELETE", `/files/${file_id}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/retrieve
   *
   * @param {string} file_id
   */
  retrieveFile(file_id) {
    return this.#request("GET", `/files/${file_id}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/retrieve-content
   *
   * @param {string} file_id
   */
  retrieveFileContent(file_id) {
    return this.#request("GET", `/files/${file_id}/content`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/create
   *
   * @param {CreateFineTuneData} body
   */
  createFineTune(body) {
    return this.#request("POST", "/fine-tunes", body);
  }

  /** https://beta.openai.com/docs/api-reference/fine-tunes/list */
  listFineTunes() {
    return this.#request("GET", "/fine-tunes");
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/retrieve
   *
   * @param {string} fine_tune_id
   */
  retrieveFineTune(fine_tune_id) {
    return this.#request("GET", `/fine-tunes/${fine_tune_id}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/cancel
   *
   * @param {string} fine_tune_id
   */
  cancelFineTune(fine_tune_id) {
    return this.#request("POST", `fine-tunes/${fine_tune_id}/cancel`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/events
   *
   * @param {string} fine_tune_id
   * @param {boolean} [stream]
   */
  listFineTuneEvents(fine_tune_id, stream = false) {
    return this.#request(
      "GET",
      `/fine-tunes/${fine_tune_id}/events?stream=${stream}`,
    );
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/delete-model
   *
   * @param {string} model
   */
  deleteFineTuneModel(model) {
    return this.#request("DELETE", `/models/${model}`);
  }
}

/**
 * @typedef CreateCompletionBody
 * @property {string} model
 * @property {string | string[]} [prompt]
 * @property {string} [suffix]
 * @property {number} [max_tokens]
 * @property {number} [temperature]
 * @property {number} [top_p]
 * @property {number} [n]
 * @property {number} [logprobs]
 * @property {string | string[]} [stop]
 * @property {number} [presence_penalty]
 * @property {number} [frequency_penalty]
 * @property {number} [best_of]
 * @property {Record<string, string>} [logit_bias]
 */

/**
 * @typedef CreateEditBody
 * @property {string} model
 * @property {string} [input]
 * @property {string} instruction
 * @property {number} [n]
 * @property {number} temperature
 * @property {number} [top_p]
 */

/**
 * @typedef CreateImageBody
 * @property {string} prompt
 * @property {number} [n]
 * @property {"256x256" | "512x512" | "1024x1024"} [size]
 * @property {"url" | "b64_json"} [response_format]
 */

/**
 * @typedef CreateImageEditBody
 * @property {string} image
 * @property {string} [mask]
 * @property {string} prompt
 * @property {number} [n]
 * @property {"256x256" | "512x512" | "1024x1024"} [size]
 * @property {"url" | "b64_json"} [response_format]
 */

/**
 * @typedef CreateImageVariationBody
 * @property {string} image
 * @property {number} [n]
 * @property {"256x256" | "512x512" | "1024x1024"} [size]
 * @property {"url" | "b64_json"} [response_format]
 */

/**
 * @typedef CreateEmbeddingsBody
 * @property {string} model
 * @property {string | string[]} input
 */

/**
 * @typedef UploadFileBody
 * @property {string} [file]
 * @property {string} [purpose]
 */

/**
 * @typedef CreateFineTuneData
 * @property {string} training_file
 * @property {string} [validation_file]
 * @property {string} [model]
 * @property {number} [n_epochs]
 * @property {number} [batch_size]
 * @property {number} [learning_rate_multiplier]
 * @property {number} [prompt_loss_weight]
 * @property {boolean} [compute_classification_metrics]
 * @property {number} [classification_n_classes]
 * @property {string} [classification_positive_class]
 * @property {unknown[]} [classification_betas]
 * @property {string} [suffix]
 */
