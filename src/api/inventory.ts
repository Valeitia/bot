export const add = async function (client, message, discord_id, item, amount) {
    let data = {
        discord_id: discord_id,
        item: item,
        amount: amount
    }

    client.post("api/inventory/add", data).then((res) => {
        client.embed({ description: res.data.message }, message);
    }).catch((err) => {
        console.log(err);
    })
}

export const remove = async function (client, message, discord_id, item, amount) {
    let data = {
        discord_id: discord_id,
        item: item,
        amount: amount
    }

    client.post("api/inventory/remove", data).then((res) => {
        client.embed({ description: res.data.message }, message);
    }).catch((err) => {
        console.log(err);
    })
}