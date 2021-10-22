interface Response<T> {
    data?: T | null;
    error?: Object | null;
    loading?: boolean;
}

export default Response;