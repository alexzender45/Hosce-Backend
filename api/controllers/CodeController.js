import models from '../models';

const { Code } = models;

const CodeGen = {
    async generateCode(req, res, next) {
      res.setHeader('content-type', 'application/json');
      try {
        const { code } = req.body;
        const codes = await Code.create({ code });
        return res.status(201).json({
          status: 'success',
          codes
        });
      } catch (err) {
        console.log(err)
        return res.status(400).json({
          status: 'error',
          err: err
        });
      }
    },
    async fetchAllCodes(req, res, next) {
        try {
          const code = await Code.findAll();
          return res.status(200).json({
            status: 'success',
            code
          });
        } catch (err) {
          return res.status(400).json({
            status: 'success',
            err: err
          });
        }
      }
}
export default CodeGen;