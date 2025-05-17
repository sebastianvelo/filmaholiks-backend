/* eslint-disable import/prefer-default-export */
export const mapError = (reason: unknown): Error => reason instanceof Error ? reason : new Error(String(reason));
