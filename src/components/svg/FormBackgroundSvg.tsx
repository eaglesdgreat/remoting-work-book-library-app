interface props {
  classes: Record<string, string>
}

const FormBackgroundSvg = ({ classes }: props) => {
  return (
    <>
      <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_7_125)">
            <path d="M428.5 533C214.007 483.955 13.4369 1084 13.4369 1084H0V-2H1917L1568 280.5C1568 280.5 1006.62 714.658 811 723C615.383 731.342 619.419 576.655 428.5 533Z" fill="url(#paint0_linear_7_125)"/>
          </g>

          <defs>
            <filter id="filter0_f_7_125" x="-200" y="-202" width="2317" height="1486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_7_125"/>
            </filter>

            <linearGradient id="paint0_linear_7_125" x1="531.5" y1="-51.0001" x2="1652" y2="729.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F38B40"/>
              <stop offset="0.0001" stopColor="#F34040"/>
              <stop offset="1" stopColor="#FFB5B5"/>
            </linearGradient>
          </defs>
        </svg>

        <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.shadow}>
          <g filter="url(#filter0_d_7_126)">
            <path
              d="M422.191 543.979C192.258 503.244 -0.0049549 1077.16 -0.0049549 1077.16L-24.5485 0.28931L2015.36 -70.4756L1632.2 225.998C1632.2 225.998 1048.5 730.186 840.631 745.682C632.759 761.179 626.854 580.237 422.191 543.979Z"
              fill="url(#paint0_linear_7_126)"
            />
          </g>

          <defs>
            <filter id="filter0_d_7_126" x="-28.5485" y="-70.4756" width="2047.91" height="1155.64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_126"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_126" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_7_126" x1="533.5" y1="-250.046" x2="930.38" y2="1569.83" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FA7C54"/>
              <stop offset="1" stopColor="#EC2C5A"/>
            </linearGradient>
          </defs>
        </svg>
    </>
  );
};

export default FormBackgroundSvg;