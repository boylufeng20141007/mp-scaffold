import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import EslintFriendlyFormatter from 'eslint-friendly-formatter';

const rules = [
  {
    test: /\.js$/,
    include: [path.resolve(__dirname, 'src')],
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      },
      {
        loader: 'eslint-loader',
        options: {
          formatter: EslintFriendlyFormatter
        }
      }
    ]
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.s[ac]ss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'sass-loader'
      ]
    })
  },
  {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'stylus-loader'
      ]
    })
  }
];

export default rules;