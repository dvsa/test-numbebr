/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mockContext from 'aws-lambda-mock-context';
import { NumberService } from '../../src/services/NumberService';
import { HTTPResponse } from '../../src/utils/HTTPResponse';
import { generateTNumber } from '../../src/functions/generateTNumber';

describe('generate TNumber Function', () => {
  it('should invoke NumberService', async () => {
    let ctx: any = mockContext();

    const mock = jest.fn().mockResolvedValue('Something');
    NumberService.prototype.createTNumber = mock;

    await generateTNumber({}, ctx, () => {

    });
    expect(mock.mock.calls).toHaveLength(1);
    ctx.succeed('done');
    ctx = null;
  });

  it('should return a 200 response on success', async () => {
    let ctx: any = mockContext();

    NumberService.prototype.createTNumber = jest
      .fn()
      .mockResolvedValue('Something');

    const output = await generateTNumber({}, ctx, () => {

    });
    expect(output).toBeInstanceOf(HTTPResponse);
    expect(output.statusCode).toBe(200);
    expect(output.body).toEqual(JSON.stringify('Something'));
    ctx.succeed('done');
    ctx = null;
  });

  it('should RETURN error on failure', async () => {
    let ctx: any = mockContext();

    const myError = new Error('Oh no!');
    NumberService.prototype.createTNumber = jest
      .fn()
      .mockImplementation(() => Promise.reject(myError));

    expect.assertions(2);
    const output = await generateTNumber({}, ctx, () => {

    });
    expect(output).toBeInstanceOf(Error);
    expect(output.message).toBe('Oh no!');
    ctx.succeed('done');
    ctx = null;
  });
});
