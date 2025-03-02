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

### Puglin preperation
Install ```./vscode/customizecodesnippet-0.0.1.vsix``` in vscode.

### Puglin configuration (optional)
Configure snippet path (absolute path) in plugin Settings (```@ext:undefined_publisher.customizecodesnippet```). By default, the snippet path is  ```[ extension_path ]/snippets.json```.

### Generator requirement
Run ```pip install -r requirements.txt``` in ```./generator```

### Customization with generator
Edit ```./generator/snippets.yaml``` like the existing examples. Run ```python ./generator/generator.py``` to output ```./generator/vscode/snippets.json``` and documentation ```./generator/doc/snippets.md```. Replace your configurated snippet path (or the default one) with ```./generator/vscode/snippets.json```
