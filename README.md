# CustomizeCodeSnippet
Boost developer's productivity with customizable snippet configuration.

# Content
What this repo provides.

## Vscode Plugin
A light-weight vscode snippet puglin which loads snippet configuration from user-customized json. 

## Snippet generator
A python script that helps developer to customize snippet configuration easily. This script converts edit-friendly ```yaml``` format to ```snippets.json``` used by the plugin.

# Usage
Enjoy a quick start with the following steps:
 - Install ```vscode/xxx.vsix``` in vscode.
 - [Optional] Configure snippet path (absolute path) in plugin Settings (```@ext:undefined_publisher.customizecodesnippet```). By default, ```[ extension_path ]/snippets.json``` is loaded.
 - [Customization] Edit ```generator/snippets.yaml``` like the existing examples. Run ```python ./generator/generator.py``` to output ```generator/vscode/snippets.json``` and documentation ```generator/doc/snippets.md```.
 - Update your customized ```snippets.json``` with your configed snippet path (or the default one).
