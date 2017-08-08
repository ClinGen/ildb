

class QueryBase(object):
  """ Case Vault Query Base """
  
class QueryDesc(object):
  """ Metadata describing a query """
  def __init__(self, id, name, description, help, parameters):
    self.id = id
    self.name = name
    self.description = description
    self.help = help
    self.parameters = parameters

class QueryDescParam(object):
  """ Description of the query parameters """
  def __init__(self, name, type = "str", required = True, options = None):
    self.name = name
    self.type = type
    self.required = required
    self.options = options