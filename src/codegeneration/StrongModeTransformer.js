// Copyright 2013 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strong';

import {
  FunctionBody,
  Script
} from '../syntax/trees/ParseTrees.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {createUseStrictDirective} from './ParseTreeFactory.js';
import {hasUseStrong} from '../semantics/util.js';

function prepend(statements) {
  return [
    createUseStrictDirective(),
    ...statements
  ]
}

export class StrongModeTransformer extends ParseTreeTransformer {
  transformScript(tree) {
    if (!hasUseStrong(tree.scriptItemList))
      return tree;
    return new Script(tree.location, prepend(tree.scriptItemList));
  }
  transformFunctionBody(tree) {
    if (!hasUseStrong(tree.statements))
      return tree;
    return new FunctionBody(tree.location, prepend(tree.statements));
  }

  static transformTree(tree) {
    return new MakeStrongTransformer().transformAny(tree);
  }
}