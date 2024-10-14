import { afterEach, describe, expect, it, vi } from "vitest";
import { Env } from "../main";

describe('Environment', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should throw an error if the environment is not set', () => {
    const env = Env.create({
      PORT: 'number'
    });

    expect(() => env.get('PORT')).toThrowError();
  });

  it('should return the value of the environment variable', () => {
    vi.stubEnv('PORT', '3000');
    
    const env = Env.create({
      PORT: 'number'
    });

    expect(env.get('PORT')).toBe(3000);
    expect(env.get('PORT')).toBeTypeOf('number');
  });

  it('should return the default value if the environment variable is not set', () => {
    const env = Env.create({
      PORT: 'number'
    });

    expect(env.get('PORT', 4000)).toBe(4000);
    expect(env.get('PORT', 4000)).toBeTypeOf('number');
  });

  it('should throw an error if the environment variable is not in our schema', () => {
    const env = Env.create({
      PORT: 'number'
    });

    // @ts-ignore
    expect(() => env.get('INVALID')).toThrowError();
  })
});