use barcoders::generators::image::*;
use barcoders::sym::code128::Code128;

pub fn generate_barcode(barcode_id: String) -> Vec<u8> {
    let barcode_data = format!("{}{}", "\u{0181}", barcode_id);
    let barcode = Code128::new(barcode_data).unwrap();
    let encoded_barcode = barcode.encode();

    let img = Image::JPEG {
        height: 18,
        xdim: 1,
        rotation: Rotation::Zero,
        foreground: Color::new([0, 0, 0, 255]),
        background: Color::new([255, 255, 255, 0]),
    };

    img.generate(&encoded_barcode[..]).unwrap()
}
