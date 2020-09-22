import models from '../models';

const { Code } = models;

const CodeGen = {
    async generateCode(req, res, next) {
      res.setHeader('content-type', 'application/json');
      try {
        const { code } = req.body;
        const codes = await Code.create({ code });
        return res.status(201).send({codes});
      } catch (err) {
        console.log(err)
        return next(new Error(err));
      }
    },
    async fetchAllCodes(req, res, next) {
        try {
          const code = await Code.findAll();
          return res.status(200).send(code);
        } catch (err) {
          return next(new Error(err));
        }
      }
}
export default CodeGen;