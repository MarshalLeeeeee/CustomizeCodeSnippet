# -*- coding: utf-8 -*-
import os
import re
import yaml
import json

VSCODE_DIR = './vscode'
SUBLIME_DIR = './sublime'
SUBLIME_TEMPLATE = '''<snippet>
	<content><![CDATA[
{0}
]]></content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<tabTrigger>{1}</tabTrigger>
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<scope>source.python</scope>
</snippet>
'''
DOC_DIR = './doc'
DOC_TEMPLATE = '''# Code Snippet Generator
Boost developer productivity by automating the insertion of commonly used code snippets. 
It supports customizable snippets for various programming languages, making repetitive coding tasks faster and error-free.

!!! note
    This document is generated automatically,

	
## Snippets

{0}
'''
DOC_SNIPPET_TEMPLATE = '''
### {0}
```
{1}
```

'''

class Generator(object):

	def __init__(self):
		self._data = {}

	def run(self):
		with open('snippets.yaml', 'r') as file:
			_raw_data  = yaml.safe_load(file)
		if not _raw_data :
			return

		for snippet in _raw_data ['snippets']:
			_name = '_'.join(snippet['name'].split(' '))
			_prefix = '_'.join(snippet['prefix'].split(' '))
			_body = snippet['body']
			if _body[-1] == '\n':
				_body = _body[:-1]
			self._data[_name] = {
				'name': _name,
				'prefix': _prefix,
				'body': _body,
			}

		# self._generate_for_sublime()
		self._generate_for_vscode()
		self._generate_doc()
		print('>>>> Generate snippets Over.')

	def _generate_for_sublime(self):
		if not os.path.exists(SUBLIME_DIR):
			os.makedirs(SUBLIME_DIR)
		for _data in self._data.values():
			_name = _data['name']
			_prefix = _data['prefix']
			_body = _data['body']
			_sublime_snippet_name = os.path.join(SUBLIME_DIR, _name + '.sublime-snippet')
			with open(_sublime_snippet_name, 'w') as _file:
				_file.write(SUBLIME_TEMPLATE.format(_body, _prefix))

	def _generate_for_vscode(self):
		_json_dict = {}
		for _data in self._data.values():
			_name = _data['name']
			_prefix = _data['prefix']
			_body = _data['body']
			_body_format = _body.split('\n')
			_body_format = [re.sub(r'^ {4}', '\t', _line) for _line in _body_format]
			_json_dict[_name] = {}
			_json_dict[_name]['prefix'] = _prefix
			_json_dict[_name]['body'] = _body_format
		if not os.path.exists(VSCODE_DIR):
			os.makedirs(VSCODE_DIR)
		with open(os.path.join(VSCODE_DIR, 'snippets.json'), 'w') as _file:
			json.dump(_json_dict, _file, indent=4, ensure_ascii=False)

	def _generate_doc(self):
		_doc_body = ''
		for _data in self._data.values():
			_prefix = _data['prefix']
			_body = _data['body']
			_doc_body += DOC_SNIPPET_TEMPLATE.format(_prefix, _body)
		_doc = DOC_TEMPLATE.format(_doc_body)
		if not os.path.exists(DOC_DIR):
			os.makedirs(DOC_DIR)
		with open(os.path.join(DOC_DIR, 'snippets.md'), 'w') as _file:
			_file.write(_doc)

if __name__ == '__main__':

	# parse = argparse.ArgumentParser()
	# parse.add_argument('-editor', '--editor', default='vs', help='Export editor')
	# args = parse.parse_args()

	g = Generator()
	g.run()
