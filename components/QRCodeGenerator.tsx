import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
    value: string;
    size?: number;
    className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
    value,
    size = 128,
    className = ''
}) => {
    return (
        <div className={className}>
            <QRCodeSVG
                value={value}
                size={size}
                level="M"
                includeMargin={false}
            />
        </div>
    );
};

export default QRCodeGenerator;
