import {Request, Response, NextFunction} from 'express';
import httpMocks from 'node-mocks-http';

export default function testValidator(
  validator: (req: Request, res: Response, next: NextFunction) => {},
  body: any,
  shouldBeValid: boolean,
) {
  const nextMock = jest.fn(() => {});
  const req = httpMocks.createRequest();
  req.body = body;

  const res = httpMocks.createResponse();

  validator(req, res, nextMock);

  if (shouldBeValid) expect(nextMock).toBeCalledTimes(1);
  else expect(nextMock).toBeCalledTimes(0);
}
