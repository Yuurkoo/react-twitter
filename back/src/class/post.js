class Post {
  static #list = []
  static #count = 1

  constructor(username, text) {
    this.id = Post.#count++

    this.username = username
    this.text = text
    this.date = new Date().getTime() // числове занчення в мілісекундах

    this.reply = [] // коментарі
  }

  // метод створюює пост і якщо в нього приходить значенння post то ми в reply пушемо його
  static create(username, text, post) {
    // post - необов'язковий параметр, який використовується лише тоді, коли створюється новий пост в масив reply до іншого поста
    const newPost = new Post(username, text)

    if (post) {
      post.reply.push(newPost) // значенння post то ми в reply пушемо його

      console.log(post)
    } else {
      this.#list.push(newPost) // якщо post не прийшов, додаємо його в значення нормального поста
    }
    console.log(this.#list)

    return newPost
  }

  static getById(id) {
    return this.#list.find(
      (item) => item.id === Number(id) || null,
    )
  }

  static getList = () => this.#list
}

module.exports = {
  Post,
}
