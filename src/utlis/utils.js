export const convertToImage = (img) => {
    if (!img) return;
    const byteArray = new Uint8Array(img.data);
    const blob = new Blob([byteArray], { type : 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
};