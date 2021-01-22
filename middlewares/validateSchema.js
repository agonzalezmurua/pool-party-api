const validateSchema =
  /**
   *
   * @param {import('mongoose').Model} Model
   */
  (Model) =>
    /**
     *
     * @param {Error} err
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    (req, res, next) => {
      const document = new Model(req.body);

      const error = document.validateSync();

      if (error) {
        if (res.headersSent) {
          next();
          return;
        } else {
          res.status(400);
          res.json(error);
          return;
        }
      }
      req.document = document;
      next();
    };

export default validateSchema;
