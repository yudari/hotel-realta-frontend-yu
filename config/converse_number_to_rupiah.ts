const formatCurrency = (value: string): string => {
    // Hilangkan karakter koma dan titik

    // Menghapus karakter $ dan koma dari string
    const cleanedString = value.replace(/[$,]/g, "");

    // Mengubah string menjadi number
    const numberValue = parseFloat(cleanedString);

    // Mengubah number menjadi string dengan format mata uang
    const formattedString = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(numberValue);

    console.log(formattedString)

    // Kembalikan hasil
    return formattedString;
};

export default formatCurrency