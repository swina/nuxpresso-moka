module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      display: ['Barlow Condensed','Abel','Alice','Amethysta', 'sans-serif']
    },
    extend: {
        fontFamily: {

        },
        zIndex: {
          '0' : '-1',
          '1' : '1',
          '2' : '2',
          '3' : '3',
          '4' : '4',
          '5' : '5',
          '6' : '6',
          '7' : '7',
          '8' : '8',
          '9' : '9',
          'max': '10000000',
          'top': '999999999'
        },
        lineHeight : {
          '11' : '2.75rem',
          '12' : '3.0rem',
          '13' : '3.25rem',
          '14' : '3.5rem',
          '15' : '3.755rem'
        },
        fontSize : {
          '6xl' : '3.25rem',
          '7xl' : '3.5rem',
          '8xl' : '3.75rem',
          '9xl' : '4rem',
          '10xl' : '5rem',
          '20xl' : '6rem'
        },
        width : {
          'auto'  : 'auto',
          'half'  : '50%',
          'large' : '60%',
          'wide'  : '75%',
          'extrawide' : '85%'
        },
        height: {
          '1/5': '20vh',
          '1/4': '25vh',
          '1/3': '33vh',
          '1/2': '50vh',
          '2/3': '66vh',
          '3/4': '75vh',
          '4/5': '80vh',
          '1/12' : '12vh'
        },
        scale: {
          '102': '1.02',
          '103': '1.03',
          '104': '1.04',
          '106': '1.06',
          '107': '1.07'
        }
    },
  },
  variants: {
    transform: ['responsive'],
    translate: ['responsive'],
    lineHeight: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
