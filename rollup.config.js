import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [/*
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: false,
                name: 'react-ts-lib'
            },*/
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json'}),
            terser()
        ],
        external: ['tr46', '@solana/web3.js', 'react']
    },/*
    {
        input: 'dist/cjs/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "cjs" }],
        plugins: [commonjs()],
    },*/
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        plugins: [dts()],
    }
]
