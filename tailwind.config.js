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
          '11': '11',
          '12': '12',
          '13' : '13',
          '14' : '14',
          '15' : '15',
          '16' : '16',
          '17' : '17',
          '18' : '18',
          '19' : '19',
          '102': '102',
          '103' : '103',
          '104' : '104',
          '105' : '105',
          '106' : '106',
          '107' : '107',
          '108' : '108',
          '109' : '109', 
          'max': '10000000',
          'top': '999999999',
          'xtop' : '999999999999999999',
          '2xtop' : '9999999999999999999'
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
          '101': '1.01',
          '102': '1.02',
          '103': '1.03',
          '104': '1.04',
          '105' : '1.05',
          '106': '1.06',
          '107': '1.07',
          '108' : '1.08',
          '109' : '1.09',
          '111': '1.11',
          '112': '1.12',
          '113': '1.13',
          '114': '1.14',
          '115' : '1.15',
          '116': '1.16',
          '117': '1.17',
          '118' : '1.18',
          '119' : '1.19',
          '120' : '1.20'
        },
        gridTemplateRows: {
          'pancake' : 'auto 1fr auto'
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
