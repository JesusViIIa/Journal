export const uploadFile = async(file) => {
    const cloudUrl = `https://api.cloudinary.com/v1_1/uttecam/upload`

    const formData = new FormData()
    formData.append('upload_preset', 'reactjournal')
    formData.append('file', file)
    try {
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            const cloudRes = await res.json()
            return cloudRes.secure_url
        }

    } catch (error) {
        throw error

    }


    return

}