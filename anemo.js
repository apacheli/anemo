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

  /**
   * https://beta.openai.com/docs/api-reference/models/list
   *
   * Lists the currently available models, and provides basic information about each one such as the owner and availability.
   */
  listModels() {
    return this.#request("GET", "/models");
  }

  /**
   * https://beta.openai.com/docs/api-reference/models/retrieve
   *
   * Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
   *
   * @param {string} model The ID of the model to use for this request
   */
  retrieveModel(model) {
    return this.#request("GET", `/models/${model}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/completions/create
   *
   * Creates a completion for the provided prompt and parameters
   *
   * @param {CreateCompletionBody} body
   */
  createCompletion(body) {
    return this.#request("POST", "/completions", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/edits/create
   *
   * Creates a new edit for the provided input, instruction, and parameters
   *
   * @param {CreateEditBody} body
   */
  createEdit(body) {
    return this.#request("POST", "/edits", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/images/create
   *
   * Creates an image given a prompt.
   *
   * @param {CreateImageBody} body
   */
  createImage(body) {
    return this.#request("POST", "/images/generations", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/images/create-edit
   *
   * Creates an edited or extended image given an original image and a prompt.
   *
   * @param {CreateImageEditBody} body
   */
  createImageEdit(body) {
    return this.#request("POST", "/images/edits", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/images/create-variation
   *
   * Creates a variation of a given image.
   *
   * @param {CreateImageVariationBody} body
   */
  createImageVariation(body) {
    return this.#request("POST", "/images/variations", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/embeddings/create
   *
   * Creates an embedding vector representing the input text.
   *
   * @param {CreateEmbeddingsBody} body
   */
  createEmbeddings(body) {
    return this.#request("POST", "/embeddings", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/list
   *
   * Returns a list of files that belong to the user's organization.
   */
  listFiles() {
    return this.#request("GET", "/files");
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/upload
   *
   * Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
   *
   * @param {UploadFileBody} body
   */
  uploadFile(body) {
    return this.#request("POST", "/files", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/delete
   *
   * Delete a file.
   *
   * @param {string} file_id The ID of the file to use for this request
   */
  deleteFile(file_id) {
    return this.#request("DELETE", `/files/${file_id}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/retrieve
   *
   * Returns information about a specific file.
   *
   * @param {string} file_id The ID of the file to use for this request
   */
  retrieveFile(file_id) {
    return this.#request("GET", `/files/${file_id}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/files/retrieve-content
   *
   * Returns the contents of the specified file
   *
   * @param {string} file_id The ID of the file to use for this request
   */
  retrieveFileContent(file_id) {
    return this.#request("GET", `/files/${file_id}/content`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/create
   *
   * Creates a job that fine-tunes a specified model from a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
   *
   * [Learn more about Fine-tuning](https://beta.openai.com/docs/guides/fine-tuning)
   *
   * @param {CreateFineTuneBody} body
   */
  createFineTune(body) {
    return this.#request("POST", "/fine-tunes", body);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/list
   *
   * List your organization's fine-tuning jobs
   */
  listFineTunes() {
    return this.#request("GET", "/fine-tunes");
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/retrieve
   *
   * Gets info about the fine-tune job.
   *
   * @param {string} fine_tune_id The ID of the fine-tune job
   */
  retrieveFineTune(fine_tune_id) {
    return this.#request("GET", `/fine-tunes/${fine_tune_id}`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/cancel
   *
   * Immediately cancel a fine-tune job.
   *
   * @param {string} fine_tune_id The ID of the fine-tune job to cancel
   */
  cancelFineTune(fine_tune_id) {
    return this.#request("POST", `fine-tunes/${fine_tune_id}/cancel`);
  }

  /**
   * https://beta.openai.com/docs/api-reference/fine-tunes/events
   *
   * Get fine-grained status updates for a fine-tune job.
   *
   * @param {string} fine_tune_id The ID of the fine-tune job to get events for.
   * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a `data: [DONE]` message when the job is finished (succeeded, cancelled, or failed).
   *
   * If set to false, only events generated so far will be returned.
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
   * Delete a fine-tuned model. You must have the Owner role in your organization.
   *
   * @param {string} model The model to delete
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
 * @typedef CreateFineTuneBody
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
