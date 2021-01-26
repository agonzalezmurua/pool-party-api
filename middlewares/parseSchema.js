const parseSchema =
  /**
   *
   * @param {import('mongoose').Model} Model
   */
  (Model, shouldValidate = true) =>
    /**
     *
     * @param {Error} err
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      const document = new Model(req.body);

      if (shouldValidate === true) {
        try {
          await document.validate();
        } catch (error) {
          if (res.headersSent) {
            next();
            return;
          } else {
            next(error);
            return;
          }
        }
      }
      req.document = document;

      next();
    };

export default parseSchema;
