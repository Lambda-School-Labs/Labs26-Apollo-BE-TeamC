const Requests = require('../../requests/requestModel');

const validateRequestReplies = async (req, res, next) => {
  const { id } = req.params;
  const { replies } = req.body;

  const request = await Requests.getRequestDetailed(id);

  if (!request.id) {
    return res
      .status(404)
      .json({ error: 'Could not find a request with that id' });
  }

  if (!replies) {
    return res.status(400).json({ error: 'Must include replies' });
  }

  for (const { question_id, content } of replies) {
    if (!question_id) {
      return res
        .status(400)
        .json({ error: 'Every reply must include a question id' });
    }

    if (!content) {
      return res
        .status(400)
        .json({ error: 'Every reply must include a content value' });
    }
  }

  next();
};

module.exports = {
  validateRequestReplies,
};
