export const localStorage = storageProp => {
    const propId = `amazon_relay___${storageProp}`;
    return {
        clear: async () => {
            localStorage.removeItem(propId);
        },
        get: () => {
            const dataLocal = localStorage.getItem(propId);
            return dataLocal ? JSON.parse(dataLocal) : {};
        },
        set: data => {
            localStorage.setItem(
                propId,
                JSON.stringify({
                    storage: {
                        updated_at: new Date().toISOString()
                    },
                    ...data
                })
            );
        }
    };
};
