/* goto https://coolors.co to make your own color scheme */

const pinkPurple = {
    color: '#FFFFFF',
    background: '#390099',
    block: {
        normal: '#FF8FA3',
        hover: '#FFB3C1',
        active: '#FA506F'
    },
    chess: '#FFFFFF',
    resetButton: {
        normal: '#FFBD00',
        hover: '#FFC933',
        active: 'FFBE0A',
    },
    toggleButton: {
        on: 'FF758F',
        off: 'A5A5A5',
    }
}

const sakura = {
    color: '',
    background: '',
    block: {
        normal: '',
        hover: '',
        active: ''
    },
    chess: '',
    resetButton: {
        normal: '',
        hover: '',
        active: ''
    },
    toggleButton: {
        on: '',
        off: ''
    }
}

const dark = {
    color: '#FFFFFF',
    background: '#343434',
    block: {
        normal: '#FFFFFF',
        hover: '#A0A0A0',
        active: '#E67700'
    },
    chess: '#FFFFFF',
    resetButton: {
        normal: '#B00000',
        hover: '#D60000',
        active: '#E67700',
    },
    toggleButton: {
        on: '#0EA900',
        off: '#343434',
    }   
}

export default {
    default: dark,
    pinkPurple,
    sakura,
    dark,
}